import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-college-compare',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './college-compare.component.html',
  styleUrls: ['./college-compare.component.scss']
})
export class CollegeCompareComponent {
  college1 = '';
  college2 = '';
  result: any = null;
  loading = false;
  error = '';

  isArray(val: any): boolean {
    return Array.isArray(val);
  }
  

  constructor(private http: HttpClient) {}

  compareColleges() {
    this.loading = true;
    this.error = '';
    this.result = null;

    

    const body: any = { college1: this.college1 };
    if (this.college2) body.college2 = this.college2;

    this.http.post('https://vidhyan-education-backend.onrender.com/api/compare', body).subscribe({
      next: (res) => {
        this.result = res;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.error || 'An error occurred.';
        this.loading = false;
      }
    });
  }

  downloadPDF() {
    const content = document.getElementById('pdfContent');
    if (!content) return;
  
    html2canvas(content).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('college-info.pdf');
    });
  }
  
}
