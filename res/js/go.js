$('.username').on('focus', function() {
    $('.username-i').addClass('active')
})
$('.password').on('focus', function() {
    $('.password-i').addClass('active')
})


$('.but').click(function() {
    $.post('../server/go.php', { 'username': $('.username').val(), 'password': $('.password').val() },
        (res) => {
            if (res.code == 0) {
                $('.go-hide').addClass('active')
                $('.password-i').addClass('active')
            } else if (res.code == 1) {
                setCookie('nickname', res.data[0].nickname)
                    // console.log(res)
                    // console.log(res.data)
                    // console.log(res.data[0].nickname)
                window.location.href = '../pages/index.html'
            }
        }, 'json')
})