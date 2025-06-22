using MyServer.Models;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options => 
{
    options.AddPolicy("corsPolicy", policyBuilder => 
    {
        policyBuilder.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();
app.UseCors("corsPolicy");

app.MapPost("/api/postTask",(TaskItem task) => {
    Console.WriteLine($"Recieved task {task.Task}");

    return Results.Ok($"Task {task.Task} sent successfully.");
}); 

app.Run();


