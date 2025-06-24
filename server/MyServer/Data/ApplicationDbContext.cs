using Microsoft.EntityFrameworkCore;
using MyServer.DataModels;

namespace MyServer.Data;


public class ApplicationDbContext : DbContext{

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<TodoItem> Tasks {get; set;}
    
}