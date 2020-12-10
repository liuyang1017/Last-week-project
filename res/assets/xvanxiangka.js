// 选项卡
$('.book-p > span').mouseover(function() {
    $(this)
        .addClass('active')
        .siblings().removeClass('active')
        .parent().next().find('ul')
        .removeClass('active')
        .eq($(this).index()).addClass('active')
})

$('.nav-pp > span').mouseover(function() {
    $(this)
        .addClass('active')
        .siblings().removeClass('active')
        .parent().next().find('ul')
        .removeClass('active')
        .eq($(this).index()).addClass('active')
})
$('.header-box,.hearder-bj').mouseover(function() {
    $('.header-box')
        .css({ "display": "flex" })
})
$('.header-box,.hearder-bj').mouseout(function() {
    $('.header-box')
        .css({ "display": "none" })

})

$('.hearder-b-mt>b>ul,.hearder-b-mt>b').mouseover(function() {
    $('.hearder-b-mt>b>ul')
        .css({ "display": "flex" })
})
$('.hearder-b-mt>b>ul,.hearder-b-mt>b').mouseout(function() {
    $('.hearder-b-mt>b>ul')
        .css({ "display": "none" })

})

$('.seckill-l-t>ul>a:nth-of-type(1)').mouseover(function() {
    $('.seckill-l-t>ul>span').css({
        "display": "block",
        "left": "25px"
    })
})
$('.seckill-l-t>ul>a:nth-of-type(2)').mouseover(function() {
    $('.seckill-l-t>ul>span').css({
        "display": "block",
        "left": "155px"
    })
})
$('.seckill-l-t>ul>a:nth-of-type(3)').mouseover(function() {
    $('.seckill-l-t>ul>span').css({
        "display": "block",
        "left": "285px"
    })
})
$('.seckill-l-t>ul>a:nth-of-type(4)').mouseover(function() {
    $('.seckill-l-t>ul>span').css({
        "display": "block",
        "left": "415px"
    })
})
$('.seckill-l-t>ul').mouseout(function() {
    $('.seckill-l-t>ul>span').css({
        "display": "none"
    })
})