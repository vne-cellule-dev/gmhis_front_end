// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  logo: 'assets/img/medical-logo-design.jpeg',
  production: false,
  apiUrl: 'http://localhost:8080',
  tvaRate: 18,
  airsiRate: 7.5,
  predefinedPeriode: 'PERIODE',
  dateOptions: [
    { id: 'today', value: "Aujourd'hui" },
    { id: 'yesterday', value: 'Hier' },
    { id: 'currentWeek', value: 'Semaine en cours' },
    { id: 'floatingWeek', value: 'Semaine flottante' },
    { id: 'lastWeek', value: 'Semaine précédente' },
    { id: 'currentMonth', value: 'Mois en cours' },
    { id: 'floatingMonth', value: 'Mois flottant' },
    { id: 'lastMonth', value: 'Mois précédent' },
    { id: 'currentYear', value: 'Année en cours' },
    { id: 'floatingYear', value: 'Année flottante' },
    { id: 'lastYear', value: 'Année précédente' },
  ],
  docWhiteCellBgColor: '#FFFFFF',
  docStripedCellBgColor: '#f2f2f2',
  // docStripedCellBgColor: "blue",
};

/*y
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
