using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlogApi.Data;
using BlogApi.Models;

namespace BlogApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PostsController : ControllerBase
{
    private readonly AppDbContext _context;

    public PostsController(AppDbContext context)
    {
        _context = context;
    }

    // GET /api/posts?search=&author=&isPublished=&page=1&pageSize=10
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] string? search,
        [FromQuery] string? author,
        [FromQuery] bool? isPublished,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        // güvenli limitler (sunumda anlat: performans için)
        if (page < 1) page = 1;
        if (pageSize < 1) pageSize = 10;
        if (pageSize > 50) pageSize = 50;

        var query = _context.BlogPosts.AsQueryable();

        // Arama (title + content)
        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(p =>
                p.Title.Contains(search) || p.Content.Contains(search));
        }

        // Yazara göre filtre
        if (!string.IsNullOrWhiteSpace(author))
        {
            query = query.Where(p => p.Author.Contains(author));
        }

        // Yayında mı filtresi
        if (isPublished.HasValue)
        {
            query = query.Where(p => p.IsPublished == isPublished.Value);
        }

        // Toplam kayıt sayısı (sayfalama için)
        var totalCount = await query.CountAsync();

        // Sayfalama
        var items = await query
            .OrderByDescending(p => p.CreatedDate) // en yeni üstte
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        // Sunumluk: hem data hem meta döndürüyoruz
        return Ok(new
        {
            page,
            pageSize,
            totalCount,
            totalPages = (int)Math.Ceiling(totalCount / (double)pageSize),
            items
        });
    }

    // GET /api/posts/{id}
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var post = await _context.BlogPosts.FindAsync(id);
        if (post == null) return NotFound();
        return Ok(post);
    }

    // POST /api/posts
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateBlogPostDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var post = new BlogPost
        {
            Title = dto.Title,
            Content = dto.Content,
            Author = dto.Author,
            IsPublished = dto.IsPublished,
            CreatedDate = DateTime.Now
        };

        _context.BlogPosts.Add(post);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = post.Id }, post);
    }

    // PUT /api/posts/{id}
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateBlogPostDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var post = await _context.BlogPosts.FindAsync(id);
        if (post == null) return NotFound();

        post.Title = dto.Title;
        post.Content = dto.Content;
        post.Author = dto.Author;
        post.IsPublished = dto.IsPublished;

        await _context.SaveChangesAsync();

        return Ok(post);
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
