import { Directive, ElementRef, HostListener } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Directive({
  selector: '[appCurrencyMask]'
})
export class CurrencyMaskDirective {
  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    const parsedValue = this.parseCurrencyValue(value);
    const formattedValue = this.formatCurrency(parsedValue);
    this.el.nativeElement.value = formattedValue;
  }

  private parseCurrencyValue(value: string): number {
    const replacedValue = value.replace(/\D/g, ''); // Remove all non-numeric characters
    return Number(replacedValue) / 100;
  }

  private formatCurrency(value: number): string {
    if (!isNaN(value)) {
      const formattedValue = value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      return formattedValue;
    }
    return '';
  }
}