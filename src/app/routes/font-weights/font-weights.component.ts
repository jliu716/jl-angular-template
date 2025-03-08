import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

var fontStylesOSX: any = {
  '100': 'Thin',
  '200': 'Thin',
  '300': 'Light',
  '400': 'Regular',
  '500': 'Medium',
  '600': 'Bold',
  '700': 'Bold',
  '800': 'Black',
  '900': 'Black',
};

@Component({
  selector: 'app-font-weights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './font-weights.component.html',
  styleUrl: './font-weights.component.less'
})
export class FontWeightsComponent {

  fonts: FontDescription[] = [100, 200, 300, 400, 500, 600, 700, 800, 900].map((weight) => ({
    weight: weight,
    familyName: '',
    style: fontStylesOSX[weight],
    postScriptName: '',
  }));

  robotoFonts: FontData[] = [];

  ngAfterViewInit() {

    if (!('queryLocalFonts' in window)) return;

    if (typeof window.queryLocalFonts !== 'function') return;

    window.queryLocalFonts().then((fonts: FontData[]) => {
      this.robotoFonts = fonts.filter((font) => /roboto/i.test(font.family));
      console.log(this.robotoFonts);
      this.populatePostScriptFontNames();
      this.populateFontFamilyNames();
    });
  }

  private populateFontFamilyNames() {
    for (let font of this.fonts) {
      let tr = document.querySelector(`tr.rendered-font.font-${font.weight}`) as HTMLElement;
      let styles = window.getComputedStyle(tr);
      font.familyName = styles.font;
    }
  }

  private populatePostScriptFontNames() {
    for (let weight of this.fonts) {
      const fontStyleName = fontStylesOSX[weight.weight];
      const theFont = this.robotoFonts.find((font) => font.style === fontStyleName);
      weight.postScriptName = theFont ? theFont.postscriptName : '';
    }
  }
}


interface FontDescription {
  weight: number;
  familyName: string;
  style: string;
  postScriptName: string;
}

interface FontData {
  family: string;
  postscriptName: string;
  fullName: string;
  style: string;
}