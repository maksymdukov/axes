module.exports = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Demystifying Email Design</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body>
<div>
    <p>
        <span style="font-weight: bold;">Name:</span>
        <span style="margin-left: 10px;"><%= name %></span>
    </p>
    <p>
        <span style="font-weight: bold;">Email:</span>
        <span style="margin-left: 10px;"><%= email %></span>
    </p>
    <p>
        <span style="font-weight: bold;">Phone:</span>
        <span style="margin-left: 10px;"><%= phone %></span>
    </p>
    <p>
        <span style="font-weight: bold;">Message:</span>
    </p>
    <p><%= message %></p>
</div>
</body>
</html>
`;
