[
  {
    question: "Семантическая верстка",
    answer: "Это разметке страницы на смысловое предназначение каждого блока",
  },
  {
    question: "Абстрактный класс",
    answer: `Называеться такой класс которого нельзя создать экземпляк класса но можешь отнаследоваться, ключевое слово abstract
    Может содержать `,
  },
  {
    question: "Оптимизации в react. React Profiler",
    answer: `
    0) сначало надо открыть devTools потом принимаем решения о кешировани токго или иного конетна
    далее идем в profiler смотрим время рендереа и количество лишних рендеров и при необходимости оптимизируем
    1) перенос статики на s3 cdm
    2) разбить на chunks
    3) кеширования на бекэнде запросов, на клиента 
    4) на реакте оптимазация черезе memo, useMemo, useCallback
    5) механизм Reconciliation для списков простовлять ключи даби не перерисовывать полностью дом
    `,
  },
  {
    question: "Promise",
    answer: `
        Promise.all -  ждёт выполнения всех промисов (или первого метода reject()).
        Promise.allSettled - выполнениn все промисы
        Promise.race - вернет первый выполнинй это может быть как reject так и resolve
        Promise.any - вернет первый resolve

        const fethPormiss = todos.map((url, i) => {
            return fetch(url).then((reosonse) => reosonse.json());
        });

        Promise.all(fethPormiss)
            .then((r) => console.log(r))
            .catch((error) => console.error('Error fetching data:', error));

        // ---

        var p1 = new Promise(function (resolve, reject) {
            setTimeout(resolve, 500, 'один');
        });
        var p2 = new Promise(function (resolve, reject) {
            setTimeout(reject, 100, 'два');
        });

        Promise.any([p1, p2]).then(function (value) {
            console.log(value); // "один"
            // Оба вернули resolve, однако p2 вернул результат первым
        });

        Promise.race([p1, p2]).then(
            // resolve
            function (value) {
                console.log(value);
            },
            // reject
            // вернул первым reject p2
            function (value) {
                console.log(value); // "два"
            }
        );
    `,
  },
  {
    question: "",
    answer: "",
  },
  {
    question: "",
    answer: "",
  },
  {
    question: "",
    answer: "",
  },
  {
    question: "",
    answer: "",
  },
  {
    question: "",
    answer: "",
  },
  {
    question: "",
    answer: "",
  },
];
