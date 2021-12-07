import { createEvent } from './functions'

const RealDate = Date.now

beforeAll(() => {
    global.Date.now = jest.fn(() => new Date('2019-04-07T10:20:30Z').getTime())
})
const weekday = 'mon';
const week = 1;
const openHour = 8;
const closeHour = 14;
test('Validation a event title and content basic', () => {
    const result = createEvent(weekday, week, openHour, closeHour);
    const duration = [closeHour - openHour, "hour"]
    
    expect(result.title).toBe("[SOFKA U] Meeting Room");
    expect(result.description).toBe("Mentoring and Practice");
    expect(result.duration).toEqual(duration);
});

test('Validation start date', () => {
 
    const currentDay = new Date().getDay();
    const numDay = NUM_DAY[weekday];
    const date = getDateCalendar(numDay, currentDay);

    const result = createEvent(weekday, week, openHour, closeHour);

    expect(result.start).toStrictEqual(date);

});

test('Validation date', () => {
    const currentDay = new Date().getDay();
    const numDay = NUM_DAY[weekday];
    const date = getDateCalendar(numDay, currentDay);
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };

    const start = new Date(date).toLocaleDateString('es-ES', options);

    const result = createEvent(weekday, week, openHour, closeHour);

    expect(result.date).toEqual(start);
});


describe('Validation illegal arguments', () => {

    test('(closeHour - openHour) < 0', () => {
        const error = () => {
            createEvent(weekday, week, 14, 8);
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


test('create an event list of at least 10 events', () => {
    const listEvent = [
        {
            weekday: 'mon',
            week: 1,
            openHour: 8,
            closeHour: 14
        },
        {
            weekday: 'tue',
            week: 2,
            openHour: 8,
            closeHour: 14
        },
        {
            weekday: 'wed',
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
            weekday: 'mon',
            week: 5,
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
            weekday: 'wed',
            week: 8,
            openHour: 8,
            closeHour: 14
        },
        {
            weekday: 'thu',
            week: 1,
            openHour: 8,
            closeHour: 14
        }
        
    ]

    listEvent.map(eventData => {
        const currentDay = new Date().getDay();
        const numDay = NUM_DAY[eventData.weekday];
        const date = getDateCalendar(numDay, currentDay);
        const duration = [closeHour - openHour, "hour"]

    
        const result = createEvent(eventData.weekday, eventData.week, eventData.openHour, eventData.closeHour )
        
        expect(result.title).toBe("[SOFKA U] Meeting Room");
        expect(result.description).toBe("Mentoring and Practice");
        expect(result.duration).toEqual(duration);
    })

});


function addDays(days) {
    return new Date(new Date().setDate(new Date().getDate() + days));
}

function getDateCalendar(numDay, currentDay) {
    const hour = new Date().getHours();
    if (numDay >= currentDay && parseInt(closeHour) >= hour) {//posterior a dia de la semana
        return addDays((numDay - currentDay) + 7 * (week - 1));
    }
    return addDays((numDay - currentDay) + 7 * (week - 1));
}

const NUM_DAY = { 'mon': 1, 'tue': 2, 'wed': 3, 'thu': 4, 'fri': 5, 'sat': 6, 'sun': 7 };

const expectResults = [
    {
        title: "[SOFKA U] Meeting Room",
        description: "Mentoring and Practice",
        duration: [closeHour - openHour, "hour"]
    }
]
