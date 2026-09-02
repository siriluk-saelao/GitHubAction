//document.getElementById('button1').addEventListener('click',function()
//{
//    alert('Github Pass!! Test Pass YOU CAN DO IT!!!!!!!!');
//});

document.getElementById('button1').addEventListener('click', function() {

    const userName = document.getElementById('nameInput').value;
    const lettersOnly = /^[a-zA-Zก-ฮะ-์]+$/;

    if (userName.trim() === '') {
        alert('Fail: กรุณากรอกชื่อก่อนกดปุ่ม!');
        return; 
    }

    if (lettersOnly.test(userName)) {
        alert('Pass: ข้อมูลถูกต้อง');
    } else {
        alert('Fail: ไม่อนุญาตให้ใช้ตัวเลขหรืออักขระพิเศษ');
    }
});