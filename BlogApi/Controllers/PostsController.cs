using BlogApi.Data;
using BlogApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BlogApi.Controllers;

[ApiController]
[Route("api/posts")]
public class PostsController : ControllerBase
{
    private readonly AppDbContext _context;

    public PostsController(AppDbContext context)
    {
        _context = context;
    }

    // GET /api/posts
    [HttpGet]
    public async Task<ActionResult<IEnumerable<BlogPost>>> GetAll()
    {
        var posts = await _context.BlogPosts
            .OrderByDescending(p => p.CreatedDate)
            .ToListAsync();

        return Ok(posts);
    }

    // GET /api/posts/{id}
    [HttpGet("{id:int}")]
    public async Task<ActionResult<BlogPost>> GetById(int id)
    {
        var post = await _context.BlogPosts.FindAsync(id);
        if (post == null) return NotFound();

        return Ok(post);
    }

    // POST /api/posts
    [HttpPost]
    public async Task<ActionResult<BlogPost>> Create([FromBody] CreateBlogPostDto dto)
    {
        if (!ModelState.IsValid) return ValidationProblem(ModelState);

        var post = new BlogPost
        {
            Title = dto.Title,
            Content = dto.Content,
            Author = dto.Author,
            IsPublished = dto.IsPublished,
            CreatedDate = DateTime.UtcNow
        };

        _context.BlogPosts.Add(post);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = post.Id }, post);
    }

    // PUT /api/posts/{id}
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateBlogPostDto dto)
    {
        if (!ModelState.IsValid) return ValidationProblem(ModelState);

        var post = await _context.BlogPosts.FindAsync(id);
        if (post == null) return NotFound();

        post.Title = dto.Title;
        post.Content = dto.Content;
        post.Author = dto.Author;
        post.IsPublished = dto.IsPublished;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    // DELETE /api/posts/{id}
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var post = await _context.BlogPosts.FindAsync(id);
        if (post == null) return NotFound();

        _context.BlogPosts.Remove(post);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
