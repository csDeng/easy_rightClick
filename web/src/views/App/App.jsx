import "./App.css";
import { Component } from "react";
import RightClick from "../RightClick/RightClick";
import api from "../../utils/api";

class App extends Component {
  state = {
    list: [],
    sum: 0,
    cid: 0,
    show: false,
  };
  componentDidMount() {
    this.get_list();
  }
  async getSum() {
    let sum = 0;
    this.state.list.forEach((e) => {
      if (!e.isDelete) {
        sum += e.value;
      }
    });
    await this.setState({
      sum: sum,
    });
  }
  get_list = () => {
    const _this = this;
    api.App.get_list().then(
      (res) => {
        const { status, data } = res;
        if (status === 200) {
          // console.log("列表更新", data);
          _this.setState(
            {
              list: data,
            },
            () => {
              _this.getSum();
            }
          );
          // console.log("更新后", this.state.list);
        }
      },
      (err) => {
        alert("获取列表失败");
      }
    );
  };
  delete(id) {
    api.App.delete(id).then(
      (r) => {
        if (r.status === 200) {
          alert("删除成功");
          this.get_list();
        }
      },
      (e) => {
        console.log("删除失败", e);
      }
    );
  }

  change(id) {
    // console.log("修改id=", id);
    this.setState({ 
      cid: id ,
      show:true
    });
  }
  changeInfo(){
    const num = document.getElementById('newVal')
    const { value:name } = document.getElementById('newName')
    let { value } = num
    let arr = value.split('')
    for(let i=0, j = arr.length; i<j; i++){
        if( arr[i]<'0'|| arr[i]>'9'){
            alert('输入的价值格式错误,请重新输入')
            num.value = ''
            return
        }
    }
    value = parseInt(value)
    // console.log(name,value)
    api.App.change(this.state.cid,name,value).then(r=>{
        // console.log("修改结果",r)
        if( r.status ===200 ){
            alert('修改成功')
            this.setState({show:false},()=>this.get_list())
        }
    })
  }

  listItem = () =>
    this.state.list.map((e) => {
      // console.log("渲染", e);
      return (
        <tr key={e.name + e.id}>
          <td>{e.id}</td>
          <td>{e.name}</td>
          <td>{e.value}</td>
          <td>
            <button className="action" onClick={() => this.delete(e.id)}>
              删除
            </button>
            <button
              className="action"
              onClick={() => {
                this.change(e.id);
              }}
            >
              修改
            </button>
          </td>
        </tr>
      );
    });

  render() {
    return (
      <div className="main">
        <h1>云驭财务最小系统</h1>
        <hr />
        {this.state.show ? (
          <div className="change">
            <p>要修改的财物的id={this.state.cid}</p>
            <p>不输入则不修改哦！！！</p>
            <div id="input">
              <input id="newName" placeholder="请输入新的名字" />
              &nbsp;
              <input id="newVal" placeholder="请输入新的财物价值" />
            </div>

            <br />
            <div id="btn">
              <button onClick={()=>{this.changeInfo()}}>确认修改</button> &nbsp; <button onClick={()=>{this.setState({ show:false })} } >取消修改</button>
            </div>
          </div>
        ) : null}

        <table id="table" border="1">
          <thead>
            <tr>
              <th>id</th>
              <th>名称</th>
              <th>价值</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>{this.listItem()}</tbody>
          <tfoot>
            <tr>
              <td colSpan="4">价值总和￥{this.state.sum}元</td>
            </tr>
          </tfoot>
        </table>
        <RightClick
          update={() => {
            this.get_list();
          }}
        />
      </div>
    );
  }
}

export default App;
