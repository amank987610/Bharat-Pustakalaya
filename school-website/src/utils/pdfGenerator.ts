import jsPDF from 'jspdf';

interface Subject {
  name: string;
  marks: number;
  maxMarks: number;
  grade: string;
}

interface TestReport {
  studentName: string;
  class: string;
  rollNumber: string;
  month: string;
  year: string;
  subjects: Subject[];
  totalMarks: number;
  maxTotalMarks: number;
  percentage: number;
  overallGrade: string;
}

interface AttendanceRecord {
  date: string;
  status: string;
}

interface AttendanceReport {
  studentName: string;
  class: string;
  rollNumber: string;
  month: string;
  year: string;
  totalDays: number;
  presentDays: number;
  absentDays: number;
  percentage: number;
  status: string;
  records: AttendanceRecord[];
}

export const generateTestReportPDF = (report: TestReport) => {
  const doc = new jsPDF();

  // Header
  doc.setFillColor(26, 115, 232);
  doc.rect(0, 0, 210, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text('+2 Hari Shankar Singh High School', 105, 15, { align: 'center' });
  doc.setFontSize(14);
  doc.text('Sharmapur', 105, 25, { align: 'center' });
  doc.setFontSize(16);
  doc.text('Monthly Test Report', 105, 35, { align: 'center' });

  // Student Details
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text(`Student Name: ${report.studentName}`, 20, 55);
  doc.text(`Class: ${report.class}`, 20, 65);
  doc.text(`Roll Number: ${report.rollNumber}`, 20, 75);
  doc.text(`Month: ${report.month} ${report.year}`, 150, 55);

  // Table Header
  doc.setFillColor(212, 175, 55);
  doc.rect(20, 85, 170, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.text('Subject', 25, 92);
  doc.text('Marks Obtained', 80, 92);
  doc.text('Max Marks', 130, 92);
  doc.text('Grade', 165, 92);

  // Table Content
  doc.setTextColor(0, 0, 0);
  let yPos = 105;
  report.subjects.forEach((subject, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(240, 240, 240);
      doc.rect(20, yPos - 7, 170, 10, 'F');
    }
    doc.text(subject.name, 25, yPos);
    doc.text(subject.marks.toString(), 95, yPos);
    doc.text(subject.maxMarks.toString(), 145, yPos);
    doc.text(subject.grade, 170, yPos);
    yPos += 10;
  });

  // Summary
  yPos += 10;
  doc.setFillColor(26, 115, 232);
  doc.rect(20, yPos - 7, 170, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.text('Total', 25, yPos);
  doc.text(report.totalMarks.toString(), 95, yPos);
  doc.text(report.maxTotalMarks.toString(), 145, yPos);

  yPos += 15;
  doc.setTextColor(0, 0, 0);
  doc.text(`Percentage: ${report.percentage.toFixed(2)}%`, 25, yPos);
  doc.text(`Overall Grade: ${report.overallGrade}`, 120, yPos);

  // Footer
  yPos += 20;
  doc.setFontSize(10);
  doc.text('This is a computer-generated report.', 105, yPos, { align: 'center' });
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, yPos + 7, { align: 'center' });

  // Save PDF
  doc.save(`${report.studentName}_${report.month}_${report.year}_Report.pdf`);
};

export const generateAttendancePDF = (attendance: AttendanceReport) => {
  const doc = new jsPDF();

  // Header
  doc.setFillColor(26, 115, 232);
  doc.rect(0, 0, 210, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text('+2 Hari Shankar Singh High School', 105, 15, { align: 'center' });
  doc.setFontSize(14);
  doc.text('Sharmapur', 105, 25, { align: 'center' });
  doc.setFontSize(16);
  doc.text('Attendance Report', 105, 35, { align: 'center' });

  // Student Details
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text(`Student Name: ${attendance.studentName}`, 20, 55);
  doc.text(`Class: ${attendance.class}`, 20, 65);
  doc.text(`Roll Number: ${attendance.rollNumber}`, 20, 75);
  doc.text(`Month: ${attendance.month} ${attendance.year}`, 150, 55);

  // Summary Box
  doc.setFillColor(212, 175, 55);
  doc.rect(20, 85, 170, 30, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.text(`Total Days: ${attendance.totalDays}`, 30, 95);
  doc.text(`Present: ${attendance.presentDays}`, 30, 105);
  doc.text(`Absent: ${attendance.absentDays}`, 100, 95);
  doc.text(`Percentage: ${attendance.percentage.toFixed(2)}%`, 100, 105);

  // Status
  let statusColor: [number, number, number] = [16, 185, 129];
  if (attendance.percentage < 75) statusColor = [239, 68, 68];
  else if (attendance.percentage < 85) statusColor = [245, 158, 11];

  doc.setFillColor(...statusColor);
  doc.rect(150, 90, 30, 15, 'F');
  doc.setFontSize(10);
  doc.text(attendance.status, 165, 100, { align: 'center' });

  // Attendance Records
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text('Daily Attendance Records:', 20, 130);

  // Table Header
  doc.setFillColor(212, 175, 55);
  doc.rect(20, 135, 170, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text('Date', 40, 142);
  doc.text('Status', 140, 142);

  // Table Content
  doc.setTextColor(0, 0, 0);
  let yPos = 152;
  const recordsToShow = attendance.records.slice(0, 20); // Show first 20 records

  recordsToShow.forEach((record, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(240, 240, 240);
      doc.rect(20, yPos - 5, 170, 8, 'F');
    }

    doc.text(record.date, 40, yPos);

    if (record.status === 'Present') {
      doc.setTextColor(16, 185, 129);
    } else {
      doc.setTextColor(239, 68, 68);
    }
    doc.text(record.status, 140, yPos);
    doc.setTextColor(0, 0, 0);

    yPos += 8;

    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
  });

  // Footer
  doc.setFontSize(10);
  doc.text('This is a computer-generated report.', 105, 285, { align: 'center' });
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 290, { align: 'center' });

  // Save PDF
  doc.save(`${attendance.studentName}_${attendance.month}_${attendance.year}_Attendance.pdf`);
};
