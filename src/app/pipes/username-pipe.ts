import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'shortenUsername'})
export class UsernamePipe implements PipeTransform {
    transform(value: string): any {
		let split = value.split('@');
		console.log(value,split);
		return split.length > 0? split[0]: '';
    }
}