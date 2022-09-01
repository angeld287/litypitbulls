
const request = require('supertest');
import Routes from '../src/providers/Routes';
import express from 'express'
import Locals from '../src/providers/Locals';
import session from 'express-session';
import Passport from '../src/providers/Passport';
import passport from 'passport';

let app: express.Application = express();
app.use(express.json());

const options = {
    resave: true,
    saveUninitialized: true,
    secret: Locals.config().appSecret,
    cookie: {
        maxAge: 1209600000
    }
};

app.use(session(options))

app = Passport.mountPackage(app, passport);

app = Routes.mountApi(app);

describe('Test getPageSource', () => {

    const user = {
        username: "existingadmin@test.com",
        password: "admin2807"
    }

    const body = {
        url: "https://github.com/angeld287/google_do_follow_search"
    }

    test('It must must the page source when user is logged in', async () => {
        const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(user)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(loginResponse.body.data.session).toBeDefined()

        const response = await request(app)
            .post('/api/getPageSource')
            .set('Cookie', loginResponse.header['set-cookie'])
            .send(body)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.data.success).toBe(true);

        const logoutresponse = await request(app)
            .post('/api/auth/logout')
            .set('Cookie', loginResponse.header['set-cookie'])
            .expect('Content-Type', /json/)
            .expect(200);

        expect(logoutresponse.body.data.session).toBeUndefined()
    });

    test('It must must return "You are not authorized" when user is not logged', async () => {

        const response = await request(app)
            .post('/api/getPageSource')
            .send(body)
            .expect('Content-Type', /json/)
            .expect(401);

        expect(response.body.data.message).toStrictEqual("You are not authenticated!");

    });

    test('It must must return "url cannot be blank." when the url field is empty', async () => {
        const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(user)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(loginResponse.body.data.session).toBeDefined()

        body.url = ""
        const response = await request(app)
            .post('/api/getPageSource')
            .set('Cookie', loginResponse.header['set-cookie'])
            .send(body)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.data.errors[0].message).toStrictEqual("url cannot be blank.");

        const logoutresponse = await request(app)
            .post('/api/auth/logout')
            .set('Cookie', loginResponse.header['set-cookie'])
            .expect('Content-Type', /json/)
            .expect(200);

        expect(logoutresponse.body.data.session).toBeUndefined()

    });

})