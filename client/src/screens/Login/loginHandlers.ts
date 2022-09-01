import { headers, json, _rest } from "../../utils/test-handlers-utils";

const login = _rest.post('http://localhost:3001/api/auth/login', (req, res, ctx) => {

    const _headers = headers(ctx);
    let _json = json(ctx, {});

    let _result: any = null;

    if (!req.body)
        return res(..._headers, _json, ctx.delay(100))

    _result = { errors: [{ message: "", value: "", param: "username", location: "body" }] }

    let _body: any = req.body; //existingadmin@test.com

    if (_body.username === "")
        _result.errors[0].message = "E-mail cannot be blank."

    if (_body.username === "existingadmin")
        _result.errors[0].message = "E-mail is not valid."

    if (_body.password === "")
        _result.errors[0].message = "Password cannot be blank."

    if (_body.password === "admin")
        _result.errors[0].message = "Password length must be atleast 8 characters."

    if (_body.username === "existingadmin@test.com" && _body.password === "badPass")
        _result.errors[0].message = "Invalid Username or Password."

    if (_body.username === "existingadmin@test.com" && _body.password === "admin2807")
        _result = {
            session: {
                id: 4,
                email: "existingadmin@test.com",
                phoneNumber: "8095445501",
                passwordResetToken: null,
                passwordResetExpires: null,
                fullname: "Test User Name",
                gender: "m",
                profile: null,
                userName: "existingAdmin"
            }
        };

    _json = json(ctx, {
        statusCode: "10000", message: "Success",
        data: _result
    });

    return res(..._headers, _json, ctx.delay(10))
});

const handlers = [login]

export default handlers