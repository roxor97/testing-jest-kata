import { createEvent } from "./functions";

const weekday = "mon";
const week = 1;
const openHour = 8;
const closeHour = 14;

test("Validation a event title and content basic", () => {
  const result = createEvent(weekday, week, openHour, closeHour);

  expect(result.title).toBe("[SOFKA U] Meeting Room");
  expect(result.description).toBe("Mentoring and Practice");
  expect(result.duration).toEqual([6, "hour"]);
});

test("Validation start date", () => {
  const startDate = Date.now();
  const hoy = new Date(startDate);
  hoy.setDate(hoy.getDate() - 1);
  
  const result = createEvent(weekday, week, openHour, closeHour);

  expect(result.start.setSeconds(0, 0)).toStrictEqual(hoy.setSeconds(0, 0));
});

test("Validation date", () => {
    const startDate = Date.now();

    const hoy = new Date(startDate);

    hoy.setDate(hoy.getDate() - 1);

    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const start = new Date(hoy).toLocaleDateString('es-ES', options);


    const result = createEvent(weekday, week, openHour, closeHour);

    expect(result.date).toEqual(start);
});

describe('Validation illegal arguments', () => {

    test('(closeHour - openHour) < 0', () => {
        const error = () => {
            createEvent(weekday, week, closeHour, openHour);
        };
        expect(error).toThrow(Error);
    });


    test('week < 0', () => {
        const error = () => {
            createEvent(weekday, -1, openHour, closeHour);
        };
        expect(error).toThrow(Error);
    });


    test('Argumento ilegal el dia de la semana', () => {
        const error = () => {
            createEvent('', week, openHour, closeHour);
        };
        expect(error).toThrow(Error);
    });


});

test("create an event list of at least 10 events", () => {
    const lista_eventos = [
        {
            weekday: 'mon',
            week: 4,
            openHour: 8,
            closeHour: 14
        },
        {
            weekday: 'tue',
            week: 1,
            openHour: 8,
            closeHour: 14
        },
        {
            weekday: 'mon',
            week: 3,
            openHour: 8,
            closeHour: 14
        },
        {
            weekday: 'thu',
            week: 4,
            openHour: 8,
            closeHour: 14
        },
        {
            weekday: 'tue',
            week: 1,
            openHour: 8,
            closeHour: 14
        },
        {
            weekday: 'tue',
            week: 5,
            openHour: 8,
            closeHour: 14
        },
        {
            weekday: 'wed',
            week: 8,
            openHour: 8,
            closeHour: 14
        },
        {
            weekday: 'mon',
            week: 3,
            openHour: 8,
            closeHour: 14
        }

    ];
    
    lista_eventos.map(event => {
        
        const duration = [closeHour - openHour, "hour"]

    
        const result = createEvent(event.weekday, event.week, event.openHour, event.closeHour )
        
        expect(result.title).toBe("[SOFKA U] Meeting Room");
        expect(result.description).toBe("Mentoring and Practice");
        expect(result.duration).toEqual(duration);
    })

});
