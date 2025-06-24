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

app.MapGet("/api/getTasks", async (ApplicationDbContext db) => {
    var tasks = await db.Tasks.ToListAsync();
    return Results.Ok(tasks);
});

app.MapDelete("/api/deleteItem/{id}", async (int id, ApplicationDbContext db) => {
    var taskToDelete = await db.Tasks.FindAsync(id);

    if(taskToDelete is null){
        return Results.NotFound();
    }

    db.Tasks.Remove(taskToDelete);
    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.Run();


