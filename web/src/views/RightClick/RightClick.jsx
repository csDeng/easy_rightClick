import {
    Component
} from 'react';
import './RightClick.css';
import Add from '../Add/Add';
import propTypes from 'prop-types';

class RightClick extends Component{
    state = {
        show: false
    }
    static propTypes = {
        update : propTypes.func.isRequired 
      }
    componentDidMount(){
        /**
         * 自定义菜单要被展示的时候，走如下流程
         * 1. 获取菜单menu
         * 2. 获取窗口的下拉条跟左拉条
         * 3. 获取鼠标右键的位置 
         * 4. 判断是否在可见区域
         * 5. 展示自定义菜单
         * 6. 阻止默认菜单展示
         * 7. 事件处理完毕，菜单消失
         * 
         */
        const menu = document.getElementById('menu')
        
        // 鼠标被右击
        document.oncontextmenu = function(e){
            //当有下拉条的时候必须加上当前屏幕不可视范围的left,和top值
            const { scrollTop , scrollLeft }  = document.documentElement || document.body  
            let { clientX : x , clientY :y } = e 
            
            menu.style.left = `${ scrollLeft + x }px`
            menu.style.top = `${ scrollTop + y }px`
            menu.style.display = 'block'
            return false
        }

        // 右键按钮被左击则消失
        document.addEventListener('click',()=>{
            menu.style.display = 'none'
        })

        // 按下键盘，菜单消失
        document.addEventListener('keydown', e=>{
            menu.style.display = 'none'
        })
        
        
    }
    

    render(){
        return(
            <div id='box' >
                <ul id='menu'>
                    <li className='menuItem' onClick={ () => this.setState({show:true}) }>添加</li>
                </ul>
                <Add show={this.state.show} change = {e=>{this.setState({show:false})}} update={this.props.update}/>
            </div>
        )
    }
}

export default RightClick