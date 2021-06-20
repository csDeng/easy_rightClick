import {
    Component
} from 'react';
import api from '../../utils/api/index'
import propTypes from 'prop-types';
import './Add.css';

export default class Add extends Component{
    static propTypes = {
        // 更改是否展示添加面板
        show: propTypes.bool.isRequired,
        change: propTypes.func.isRequired,

        // 回调函数，更新列表
        update : propTypes.func.isRequired
    }
    add(){
        const num = document.getElementById('value')
        const { value:name } = document.getElementById('name')
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
        api.App.save(name,value).then(r=>{
            // console.log("添加结果",r)
            if( r.status ===200 ){
                alert('添加成功')
                this.props.update()
                this.props.change()
                
            }
        })
    }

    render(){
        return(
            !this.props.show
            ? null
            :
            <div className="add">
                <div className="val">
                    <label htmlFor='name'>名称：</label><input id='name' placeholder='请输入财物的名字' />
                    <br />
                    <label htmlFor='value'>价值：</label><input id='value' placeholder='请输入财物的价值(整数)' type='number' />
                </div>
                <div className="btn">
                    <button onClick={()=>{this.add()}}>确认添加</button>
                     &nbsp;
                    <button onClick = {e=>this.props.change()} >取消添加</button>
                </div>
            </div>
        )
    }
};