using BlogApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace BlogApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
    : base(options)
    {
    }

    public DbSet<BlogPost> BlogPosts { get; set; }
}
