//document.getElementById('button1').addEventListener('click',function()
//{
//    alert('Github Pass!! Test Pass YOU CAN DO IT!!!!!!!!');
//});

document.getElementById('button1').addEventListener('click', function() {
    const userName = document.getElementById('nameInput').value;
    const lettersOnly = /^[a-zA-Zก-ฮะ-์\s]+$/; // อนุญาตให้เว้นวรรคได้ด้วย \s

    if (userName.trim() === '') {
        alert('Fail: กรุณากรอกข้อมูล!');
    } else if (lettersOnly.test(userName)) {
        alert('Pass: ข้อมูลถูกต้อง');
    } else {
        alert('Fail: ห้ามใช้ตัวเลข!');
    }
});