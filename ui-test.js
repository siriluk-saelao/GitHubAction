const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    console.log('🚀 เริ่มต้นการจำลองเป็นผู้ใช้งาน (UI Testing)...');
    
    // 1. เปิดบราวเซอร์จำลอง
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // 2. สั่งให้เปิดไฟล์ index.html ของเรา
    const filePath = `file://${path.join(__dirname, 'index.html')}`;
    await page.goto(filePath);

    // 3. เตรียมระบบดักจับและอ่านข้อความจากกล่อง Alert
    let currentAlertMessage = '';
    page.on('dialog', async dialog => {
        currentAlertMessage = dialog.message();
        await dialog.accept(); // สั่งให้บอทกดปุ่ม OK บน Alert
    });

    // ==========================================
    // 🧪 กรณีที่ 1: กรอกตัวอักษรอย่างเดียว (ต้องผ่าน)
    // ==========================================
    console.log('\n--- เริ่มการทดสอบที่ 1: กรอกตัวอักษรอย่างเดียว ---');
    await page.type('#nameInput', 'Siriluk'); // พิมพ์ข้อมูล
    await page.click('#button1');             // กดปุ่ม
    await new Promise(r => setTimeout(r, 500)); // รอ Alert เด้ง 0.5 วินาที
    
    if (currentAlertMessage.includes('Pass')) {
        console.log('✅ ผ่านเงื่อนไข: ระบบยอมรับตัวอักษรล้วนถูกต้อง');
    } else {
        console.error('❌ ไม่ผ่านเงื่อนไข: ระบบดันปฏิเสธตัวอักษรล้วน!');
        process.exit(1); // บังคับให้ Workflow พัง (ขึ้นสีแดง)
    }

    await page.reload(); // รีเฟรชหน้าเว็บเพื่อเคลียร์ช่องกรอกข้อมูล

    // ==========================================
    // 🧪 กรณีที่ 2: กรอกตัวเลขอย่างเดียว (ต้องไม่ผ่าน)
    // ==========================================
    console.log('\n--- เริ่มการทดสอบที่ 2: กรอกตัวเลขอย่างเดียว ---');
    await page.type('#nameInput', '123456');
    await page.click('#button1');
    await new Promise(r => setTimeout(r, 500));

    if (currentAlertMessage.includes('Fail')) {
        console.log('✅ ผ่านเงื่อนไข: ระบบป้องกันตัวเลขล้วนได้ถูกต้อง');
    } else {
        console.error('❌ ไม่ผ่านเงื่อนไข: ระบบดันปล่อยให้ตัวเลขล้วนผ่านไปได้!');
        process.exit(1);
    }

    await page.reload(); 

    // ==========================================
    // 🧪 กรณีที่ 3: กรอกตัวอักษรผสมตัวเลข (ต้องไม่ผ่าน)
    // ==========================================
    console.log('\n--- เริ่มการทดสอบที่ 3: กรอกตัวอักษรผสมตัวเลข ---');
    await page.type('#nameInput', 'Siriluk999');
    await page.click('#button1');
    await new Promise(r => setTimeout(r, 500));

    if (currentAlertMessage.includes('Fail')) {
        console.log('✅ ผ่านเงื่อนไข: ระบบป้องกันตัวอักษรผสมตัวเลขได้ถูกต้อง');
    } else {
        console.error('❌ ไม่ผ่านเงื่อนไข: ระบบดันปล่อยให้ตัวอักษรผสมตัวเลขผ่านไปได้!');
        process.exit(1);
    }

    // ถ้าโค้ดรันมาถึงบรรทัดนี้ได้แปลว่าผ่านหมดทุกเงื่อนไข
    console.log('\n🎉 ยินดีด้วย! การทดสอบทั้ง 3 กรณีเสร็จสมบูรณ์ ระบบป้องกันทำงานได้ 100%');
    await browser.close();
})();