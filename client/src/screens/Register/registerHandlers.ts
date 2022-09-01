import { headers, json, _rest } from "../../utils/test-handlers-utils";

const register = _rest.post('http://localhost:3001/api/auth/register', (req, res, ctx) => {

    const _headers = headers(ctx);
    let _json = json(ctx, {});

    let _result: any = null;

    if (!req.body)
        return res(..._headers, _json, ctx.delay(100))

    _result = { errors: [{ message: "", value: "", param: "username", location: "body" }] }

    let _body: any = req.body; //existingadmin@test.com

    "Username cannot be blank."


    if (_body.username === "")
        _result.errors[0].message = "Username cannot be blank."

    if (_body.email === "")
        _result.errors[0].message = "E-mail cannot be blank."

    if (_body.email === "user1234")
        _result.errors[0].message = "E-mail is not valid."

    if (_body.phoneNumber === "")
        _result.errors[0].message = "Phone Number cannot be blank."

    if (_body.password === "")
        _result.errors[0].message = "Password cannot be blank."

    if (_body.password === "admin")
        _result.errors[0].message = "Password length must be atleast 8 characters."

    if (_body.confirmPassword === "")
        _result.errors[0].message = "Confirmation Password cannot be blank."

    if (_body.fullName === "")
        _result.errors[0].message = "fullName cannot be blank."

    if (_body.gender === "")
        _result.errors[0].message = "Gender cannot be blank."



    if (
        _body.email === "noexistingadmin@test.com"
        && _body.username === "noexistingadmin"
        && _body.phoneNumber === "8292619117"
        && _body.password === "admin2807"
        && _body.confirmPassword === "admin2807"
        && _body.fullName === "Test User Name"
        && _body.gender === "m"
    )
        _result = {
            userId: 10,
            message: "The user has been created successfully"
        };

    _json = json(ctx, {
        statusCode: "10000", message: "Success",
        data: _result
    });

    return res(..._headers, _json, ctx.delay(10))
});

const handlers = [register]

export default handlers