import { Component, OnChanges, Input } from '@angular/core';

@Component({
    selector: 'app-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})
//esse componente implementa a interface onchange, que trabalha em cima de mudanças
export class StarComponent implements OnChanges {

//Essa diretiva informa que a var rating pode receber o input de um outro componente.
//Por causa dessa diretiva, essa var por consequencia acaba virando um atributo do componente (quando ele é instanciado dentro da aplicação)
    @Input()
    rating: number = 0;

    starWidth: number;

    ngOnChanges(): void {
        this.starWidth = this.rating * 74 / 5;
    }

}