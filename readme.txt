<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <style>
        body {
            background-color: #ffffff;
        }

        .login-container {
            max-width: 400px;
            margin: auto;
            padding: 20px;
            background-color: #E1E8ED;
            border-radius: 10px;
            box-shadow: 10px 10px 10px rgba(111, 104, 104, 0.1);
            margin-top: 100px;
        }

        .login-container h1 {
            color: black;
        }

        .login-container hr {
            border-top: 2px solid #0e0f0f;
        }

        .login-container input,
        .login-container button {
            margin-bottom: 15px;
        }

        .login-container button {
            background-color: #0e0f0f;
            color: #ffffff;
            transition: background-color 0.3s ease;
        }

        .login-container button:hover {
            background-color: #1a1b1b;
        }
    </style>
</head>
<body>
    <form class="row g-3">
        <div class="col-md-6">
            <h1 class="text-center">Login Form</h1>
            <hr/>
          <label for="inputEmail4" class="form-label">Email</label>
          <input type="email" class="form-control" id="inputEmail4">
        </div>
        <div class="col-md-6">
          <label for="inputPassword4" class="form-label">Password</label>
          <input type="password" class="form-control" id="inputPassword4">
        </div>
        <div class="col-12">
          <label for="inputAddress" class="form-label">Address</label>
          <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
        </div>
        <div class="col-12">
          <label for="inputAddress2" class="form-label">Address 2</label>
          <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
        </div>
        <div class="col-md-6">
          <label for="inputCity" class="form-label">City</label>
          <input type="text" class="form-control" id="inputCity">
        </div>
        <div class="col-md-4">
          <label for="inputState" class="form-label">State</label>
          <select id="inputState" class="form-select">
            <option selected>Choose...</option>
            <option>...</option>
          </select>
        </div>
        <div class="col-md-2">
          <label for="inputZip" class="form-label">Zip</label>
          <input type="text" class="form-control" id="inputZip">
        </div>
        <div class="col-12">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="gridCheck">
            <label class="form-check-label" for="gridCheck">
              Check me out
            </label>
          </div>
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary">Sign in</button>
        </div>
      </form>

    <script>
        const form = document.querySelector('form');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            fetch('/submit', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(text => {
                document.getElementById('response').innerHTML = text;
            });
        });
    </script>

    <script src="Login.js"></script>
</body>
</html>



app.post('/submit', (req, res) => {
    const formData = req.body;
    console.log(formData);
    // Server-side validation for password type
    var reg_pass = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[@#\-]).{4,8}$/;
    const zipCode = /^\d{6}$/;

    if(!reg_pass.test(formData.password) && !zipCode.test(zipCode) && !zipCode.length === 6){ 
         return res.render('error' ,{ message: "Password Format is Incorrect" });}
    else{ 
         return res.render('success', { formData });
        }
});


app.post('/submit', (req, res) => {
    const formData = req.body;
    console.log(formData);
    
    // Server-side validation for password format
    const reg_pass = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[@#\-]).{4,8}$/;
    // Server-side validation for zip code format
    const zipCodeRegex = /^\d{6}$/;

    // Validate password and zip code
    if (!reg_pass.test(formData.password)) {
        return res.render('error', { message: "Password format is incorrect. It must contain at least one digit, one uppercase letter, one lowercase letter, one special character (@, #, or -), and be 4 to 8 characters long." });
    } else if (!zipCodeRegex.test(formData.zipcode)) {
        return res.render('error', { message: "Zip code format is incorrect. It must be exactly 6 digits." });
    } else {
        return res.render('success', { formData });
    }
});


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Form</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-size: cover;
        }

        .container {
            max-width: 600px;
            margin-top: 50px;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            background-color: #e0c6ee;
        }

        .form-title {
            text-align: center;
            margin-bottom: 30px;
        }

        .form-label {
            font-weight: bold;
        }

        .btn-primary {
            width: 100%;
            color: black;
        }

        .custom-button {
            background: #f5f3f3;
            color: #fff;
            padding: 10px 20px;
            border: none;
            background: linear-gradient(45deg, #8967d9, #9f64b9);
            border-radius: 5px;
            cursor: pointer;
            transition: background 0.3s ease;
        }

        .custom-button:hover {
            background: linear-gradient(45deg, #cc0074, #6600ff);
        }

        .showcase {
            position: relative;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 0 20px;
            overflow: hidden;
        }

        .video-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            /* Hide overflow to prevent video from extending beyond viewport */
        }
    </style>
</head>
<body>
    <div class="container">
        
        <h1 class="form-title">Login Form</h1>
        <form class="row g-3" action="/submit" method="POST">
            <div class="col-md-6">
                <label for="inputEmail4" data-bs-theme="dark" class="form-label">Email</label>
                <input type="email" class="form-control" id="inputEmail4" name="email" required>
            </div>
            <div class="col-md-6">
                <label for="inputPassword4" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" name="password" required>
            </div>
            <div class="col-12">
                <label for="inputAddress" class="form-label">Address</label>
                <input type="text" class="form-control" id="Address" name="Address" required>
            </div>
            <div class="col-md-6">
                <label for="inputCity" class="form-label">City</label>
                <input type="text" class="form-control" id="City" name="City" required>
            </div>
            <div class="col-md-4">
                <label for="inputState" class="form-label">State</label>
                <select id="inputState" class="form-select" id="State" name="State" required>
                    <option selected>select</option>
                    <option>Maharashtra</option>
                    <option>Madhya Pradesh</option>
                    <option>Andhra Pradesh</option>
                    <option>Arunachal Pradesh</option>
                    <option>Assam</option>
                    <option>Bihar</option>
                </select>
            </div>
            <div class="col-md-2">
                <label for="inputZip" class="form-label">Zip</label>
                <input type="text" class="form-control" id="zipCode" name="zipCode" required>
            </div>
            <div class="col-12">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="gridCheck" required>
                    <label class="form-check-label" for="gridCheck">
                        Check me out
                    </label>
                </div>
            </div>
            <div class="col-12">
                <button type="submit" class="btn btn-primary custom-button">Sign in</button>
            </div>
        </form>
    </div>
    </div>
    <div class="col-md-6">
        <div class="row g-3" style="width: 200px; height: 200px;">
            <img src="https://i.pinimg.com/originals/22/05/c2/2205c2e9a69de62b9a1a889f916ce7ed.gif"
                class="img-fluid img-thumbnail" alt="image not loaded" >
               <br/>
                “Music is healing. Music holds things together.”
        </div>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>

</html>
https://i.pinimg.com/originals/22/05/c2/2205c2e9a69de62b9a1a889f916ce7ed.gif
https://clipart-library.com/img1/933607.gif