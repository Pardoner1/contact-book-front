import { Component } from '@angular/core';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.css'],
})
export class SolutionComponent {
  validate: string = '';
  isValid: boolean = false;

  validateTest(): boolean {
    const colchetes = this.validate;
    const colchetesValidosRegex = /^[(){}\[\]]+$/;

    if (!colchetesValidosRegex.test(colchetes)) {
      return false;
    }

    const sequencia: string[] = [];
    const compatibilidade: { [key: string]: string } = {
      ')': '(',
      '}': '{',
      ']': '[',
    };

    for (let colchete of colchetes) {
      if (['(', '{', '['].includes(colchete)) {
        sequencia.push(colchete);
      } else {
        const ultimoColchete = sequencia.pop();
        if (ultimoColchete !== compatibilidade[colchete]) {
          return false;
        }
      }
    }

    return sequencia.length === 0;
  }

  handleChange(): void {
    this.isValid = this.validateTest();
  }
}
