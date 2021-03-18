import { Component, OnInit } from '@angular/core';
import { from, Observable, of, Subject } from 'rxjs';
import { map, mergeMap, pluck, tap } from 'rxjs/operators';

type AttrbIdType = 'legal_name' | 'date_of_formation';
type DataSourceType = 'coa' | 'gems';
// <SourceData, level1>
type level0 = Map<string, level1 | level2 | null>;
// <Attrb, level3>
type level1 = Map<string, level2 | null>;
// <gemsId, value>
type level2 = Map<string, string>;

//#region Source Data
const coa = {
  'legal_name': {
    '500': '500 COA name',
    '501': '501 COA name',
    '502': '502 COA name',
  }
};
const gems = {
  legal_name: {
    '500': '500 name',
    '501': '501 name',
    '502': '502 name',
  },
  date_of_formation: {
    '500': '500 date of formation',
    '501': '501 date of formation',
    '502': '502 date of formation',
    '503': '502 date of formation',
  },
};
//#endregion
@Component({
  selector: 'app-rxjs00',
  templateUrl: './rxjs00.component.html',
  styleUrls: ['./rxjs00.component.scss']
})
export class Rxjs00Component implements OnInit {

  nextTest$ = new Subject<any>();
  constructor() { }

  l0: level0 = new Map();
  l0Obj: {} = {};

  ngOnInit(): void {
  }

  buttonClicked(btnEvent: MouseEvent) {
    console.log('Button pressed');

    const source = of([
      { name: 'Joe', age: 30 },
      { name: 'Frank', age: 20 },
      { name: 'Ryan', age: 50 }
    ]);
    const example = source.pipe(
      tap(src => console.log('Src', src)),
      mergeMap(src => src),
      // tap(src => console.log('Src 2', src)),
      pluck('name'),
      tap(src => console.log('Name', src)),
    );
    //grab each persons name, could also use pluck for this scenario
    // const example12 = source.pipe(map(({ name }) => name));
    //output: "Joe","Frank","Ryan"
    const subscribe = example.subscribe(val => console.log(val));

  }

  getGemsData = (attrb: AttrbIdType): Observable<any> => {
    return of(gems[attrb]);
  }

  getCoaData = (attrb: 'legal_name'): Observable<any> => {
    return of(coa[attrb]);
  }

  addDataButtonClick(btnEvent: MouseEvent) {
    this.addGemsDataToL0Map();
    this.addCOADataToL0Map();
    console.log('All Source Data l0', this.l0Obj);
    return;
  }

  addGemsDataToL0Map = () => {
    const attrbs: AttrbIdType[] = ['legal_name', 'date_of_formation'];
    const l1: level1 = new Map();
    const l1Obj = {};
    const dataSource = 'gems';

    attrbs.forEach(sourceDataAttrb => {
      this.getGemsData(sourceDataAttrb).subscribe(sourceData => {
        this.setLevel1(sourceDataAttrb, l1, sourceData, l1Obj);
        // l1Obj[sourceDataAttrb] = sourceData;
      })
    })
    this.l0.set(dataSource, l1);
    // this.l0Obj[dataSource] = l1Obj;
  }

  addCOADataToL0Map = () => {
    const attrbs: AttrbIdType[] = ['legal_name'];
    const l1: level1 = new Map();
    const l1Obj = {};
    const dataSource = 'coa';

    attrbs.forEach(sourceDataAttrb => {
      this.getCoaData('legal_name').subscribe(sourceData => {
        this.setLevel1(sourceDataAttrb, l1, sourceData, l1Obj);
        // l1Obj[sourceDataAttrb] = sourceData;
      })
    })
    this.l0.set(dataSource, l1);
    // this.l0Obj[dataSource] = l1Obj;
  }

  setLevel1 = (sourceDataAttrb: string, l1Map: level1, sourceData: level2, l1Obj: {}) => {
    const l2: level2 = new Map(Object.entries(sourceData));
    l1Map.set(sourceDataAttrb, l2);
  }

  doNext(btnEvent: MouseEvent) {
    this.nextTest$.next(['one', 'two']);
  }


}
