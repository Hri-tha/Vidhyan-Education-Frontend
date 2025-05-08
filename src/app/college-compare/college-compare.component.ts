import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-college-compare',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './college-compare.component.html',
  styleUrls: ['./college-compare.component.scss']
})
export class CollegeCompareComponent implements OnInit {
  college1 = '';
  college2 = '';
  result: any = null;
  loading = false;
  error = '';

  allColleges: string[] = [];
  filteredColleges1: string[] = [];
  filteredColleges2: string[] = [];

  @ViewChild('inputGroup1') inputGroup1!: ElementRef;
  @ViewChild('inputGroup2') inputGroup2!: ElementRef;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('https://vidhyan-education-backend.onrender.com/api/colleges')
      .subscribe({
        next: (data) => {
          this.allColleges = data.map(college => college.name);
        },
        error: (err) => {
          console.error('Failed to load college list', err);
        }
      });
  }

  isArray(val: any): boolean {
    return Array.isArray(val);
  }

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

  normalizeName(name: string): string {
    return name
      .toLowerCase()
      .replace('indian institute of information technology', 'iiit')
      .replace('indian institute of technology', 'iit')
      .replace('national institute of technology', 'nit')
      .replace(/,/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }
  
  filterColleges(query: string): string[] {
    const normalizedQuery = this.normalizeName(query);
    return this.allColleges.filter(college => 
      this.normalizeName(college).includes(normalizedQuery)
    ).slice(0, 5);
  }
  

  onCollege1Change() {
    this.filteredColleges1 = this.college1.trim()
      ? this.filterColleges(this.college1)
      : [];
  }

  onCollege2Change() {
    this.filteredColleges2 = this.college2.trim()
      ? this.filterColleges(this.college2)
      : [];
  }

  selectCollege1(name: string) {
    this.college1 = name;
    this.filteredColleges1 = [];
  }

  selectCollege2(name: string) {
    this.college2 = name;
    this.filteredColleges2 = [];
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (this.inputGroup1 && !this.inputGroup1.nativeElement.contains(target)) {
      this.filteredColleges1 = [];
    }
    if (this.inputGroup2 && !this.inputGroup2.nativeElement.contains(target)) {
      this.filteredColleges2 = [];
    }
  }
}
