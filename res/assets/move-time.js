function move(ele,obj,fun){
    let count = 0
    for(let key in obj){
        count++
        const timer = setInterval(() => {
            let current
            let type = key
            let target = obj[key]
            if(type === 'opacity'){
                current = window.getComputedStyle(ele)[type] * 100
                target = target * 100
            }else{
                current = parseInt(window.getComputedStyle(ele)[type])
            }
            let distance = (target - current) / 10
            distance = distance > 0 ? Math.ceil((target - current) / 10) : Math.floor((target - current) / 10)
            if(current === target){
                clearInterval(timer)
                count--
                if(count === 0){
                    fun()
                }
            }else{
                if(type === 'opacity'){
                    ele.style[type] = (current + distance) / 100
                }else{
                    ele.style[type] = current + distance + 'px'
                }
            }
        }, 20);
    }
}
