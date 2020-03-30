module.exports = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Demystifying Email Design</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body>
<div style="width: 600px;">
    <div>
        <p>Name: <strong><%= name %></strong></p>
        <p>Surname: <strong><%= surname %></strong></p>
        <p>Email: <strong><%= email %></strong></p>
        <p>Phone: <strong><%= phone %></strong></p>
        <p>Delivery: <strong><%= delivery %></strong></p>
        <% if (delivery === 'novaposhta') { %>
            <p>NovaPoshta: <strong><%= npNumber %></strong></p>
        <% } else { %>
            <p>UkrPoshta: <strong><%= ukrAddress %></strong></p>
        <% } %>
    </div>
    <table
            border="1"
            align="center"
            cellpadding="0"
            cellspacing="0"
            width="600"
            style="border-collapse: collapse;"
    >
        <tr>
            <th>
                Photo
            </th>
            <th>
                Name
            </th>
            <th>
                Amount
            </th>
        </tr>
        <% cart.forEach(item => { %>
            <tr>
                <td style="text-align: center;">
                    <% if (item.images && item.images.length) { %>
                        <img width="150" src="https://<%= item.images[0].url.substr(2) %>" alt="<%= item.images[0].title %>" />
                    <% } %>
                </td>
                <td style="text-align: center;">
                    <%= item.title %>
                </td>
                <td style="text-align: center;">
                    <%= item.count %>
                </td>
            </tr>
        <% }); %>
    </table>
</div>
</body>
</html>
`;
