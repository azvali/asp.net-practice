using MyServer.Models;
using MyServer.Data;
using Microsoft.EntityFrameworkCore;
using MyServer.DataModels;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(connectionString));

builder.Services.AddCors(options => 
{
    options.AddPolicy("corsPolicy", policyBuilder => 
    {
        policyBuilder.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();
app.UseCors("corsPolicy");

app.MapPost("/api/postTask", async (TaskItem task, ApplicationDbContext db) => {
    var todoEntity = new MyServer.DataModels.TodoItem{
        Content = task.Task
    };

    db.Tasks.Add(todoEntity);
    await db.SaveChangesAsync();

    return Results.Created($"/api/tasks/{todoEntity.Id}", todoEntity);
}); 

app.Run();


