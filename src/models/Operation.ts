import TDate from './TDate'
import { Crop } from './Crop'

export enum OperationType {
	PLOWING = 0,        // Вспашка
	BOWLING = 1,        // Боронование
	FERTILIZATION = 2,  // Внесение удобрений
	WATERING = 3,       // Полив
	RIGGING = 4,        // Прикатывание
	HARVESTING = 5      // Сбор урожая
}

export enum Assessment {
	EXCELLENT = 0,      // Отлично
	SATISFACTORILY = 1,	// Удовлетворительно
	BADLY = 2           // Плохо
}

export class Operation {
	id?: string | null;             // ID Операции
	type: OperationType;            // Тип операции
	date: TDate;                    // Дата проведения операции
	area: number;                   // Площадь проведения операции (Га)
	comment?: string | null;        // Комментарий
	assessment?: Assessment | null; // Оценка качества проведенной операции
	crop?: Crop | null; 			// Культура

	constructor(args: Operation) {
		const {
			id = null,
			type,
			date,
			area,
			comment = null,
			assessment = null,
			crop = null
		} = args;
		this.id = id;
		this.type = type;
		this.date = new TDate(date);
		this.area = area;
		this.comment = comment;
		this.assessment = assessment;
		this.crop = crop;
	}
}
