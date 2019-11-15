import * as React from "react"
import  "./index.scss"

// const canvasWidth = (window.innerWidth * 0.374) * 2 || 300;
const canvasWidth = window.innerWidth *0.8

class CanvasRadar extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.init()
    }
    init =()=>{
        const canvas = document.getElementById("canvaswrapper")
        const ctx = canvas.getContext('2d');
        const side = 5 // 多边形边数 
        const theta =  Math.PI*2/side
        const radius = canvasWidth*0.3,gap=35,starPradius= 20
       const  xCenter =  canvasWidth/ 2
       const  yCenter =  canvasWidth/ 2
        const part = 3 //外部圆个数
        let examplename = ["运算能力", "逻辑推理能力", "空间想象能力", "抽象概括能力", "实际应用能力"]
        let exampledata = [0.8, 0.6, 0.4, 0.3, 0.5]
        for(let i = 0 ; i<part;i++){
            ctx.beginPath();
            ctx.arc(xCenter,yCenter,starPradius+gap*i,0,Math.PI*2,true)
            ctx.stroke();
        }
        

        ctx.beginPath();
        for (let i=0; i<=side; i++) {
            console.log(exampledata[i%side])
            let x = Math.cos(i*theta)*radius*exampledata[i%side]+xCenter;
            let y = -Math.sin(i*theta)*radius*exampledata[i%side]+yCenter;
            ctx.lineTo(x,y);
        }
        // ctx.strokeStyle="rgba(255,255,96,1)";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
        for (let i=0; i<side; i++){
            ctx.fillStyle="rgba(0,0,0,1)";
            ctx.font="normal 12px Arial";
            let x,y
            if(Math.cos(i*theta)*radius>0) {
                x =Math.cos(i*theta)*radius+3+xCenter;
                y= -Math.sin(i*theta)*radius*1.3+yCenter;
            }else{
                x=Math.cos(i*theta)*radius*1.5+xCenter;
                y= -Math.sin(i*theta)*radius*1.3+yCenter;
            }
            ctx.fillText(examplename[i],x,y);
        }
        


    }
    initCanvas = () =>{
        const  canvas = document.getElementById("canvaswrapper")
        const  ctx = canvas.getContext('2d');
        const startPosition = {x:130,y:130},starPradius= 30,gap=25
        const maxR = starPradius+gap*2
        let examplename = ["运算能力", "逻辑推理能力", "空间想象能力", "抽象概括能力", "实际应用能力"]
        let exampledata = [80, 60, 20, 30, 50]
        const lineWidth = 2 
        // const score1 = ( exampledata[0]/100)*(80)-lineWidth
        // const score2 = ( exampledata[1]/100)*(80)-lineWidth
        // const score3 = ( exampledata[2]/100)*(80)-lineWidth
        // const score4 = ( exampledata[3]/100)*(80)-lineWidth
        // const score5 = ( exampledata[4]/100)*(80)-lineWidth
        const grd = ctx.createLinearGradient(100, 100, 300, 300);
        grd.addColorStop(0, 'rgba(255, 216, 216, .5)');
        grd.addColorStop(1, 'rgba(240, 61, 61, .5)');

        ctx.save();
        
        ctx.beginPath()
        ctx.lineWidth = lineWidth;
        ctx.arc(startPosition.x,startPosition.y,starPradius+gap*0,0,Math.PI*2,true)
        ctx.arc(startPosition.x,startPosition.y,starPradius+gap*1,0,Math.PI*2,true)
        ctx.arc(startPosition.x,startPosition.y,starPradius+gap*2,0,Math.PI*2,true)
        console.log(score1,score2,score3,score4,score5)

        ctx.translate(canvasWidth / 2, canvasWidth / 2);
        ctx.moveTo(score1,score1)
        ctx.lineTo(score2,-score2)
        // ctx.lineTo(score3,-score3)
        // ctx.lineTo(-score4,-score4)
        // ctx.lineTo(score5,-score5)
        ctx.closePath();
        ctx.restore()

        ctx.stroke();
        examplename.map((item,i)=>{
            let step = 0 + 360/exampledata.length *i
            let rad =  (step/360)*Math.PI*2
            let x = startPosition.x+ Math.sin(rad)*maxR
            let y = startPosition.y+ Math.cos(rad)*maxR
            ctx.moveTo(x,y)
            ctx.beginPath()
            ctx.arc(x,y,3,0,Math.PI*2,true)
            switch (i){
                case 0: 
                ctx.fillText(item,x-10,y+20)
                break;
                case 1:
                ctx.fillText(item,x+10,y+10);
                break;
                case 2: 
                ctx.fillText(item,x+10,y-10);
                break;
                case 3:
                ctx.fillText(item,x-40,y-20);
                break;
                case 4:
                ctx.fillText(item,x-55,y+20);
                break;
                default:;
            }
            ctx.closePath()
            ctx.fill()
        })
    }
    render(){
        return(
            <canvas id='canvaswrapper' width= {canvasWidth} height = {canvasWidth}></canvas>
        )
    }
}
export default CanvasRadar
