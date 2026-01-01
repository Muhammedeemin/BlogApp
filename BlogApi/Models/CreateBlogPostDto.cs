using System.ComponentModel.DataAnnotations;

namespace BlogApi.Models;

public class CreateBlogPostDto
{
    [Required]
    public string Title { get; set; } = "";

    public string Content { get; set; } = "";

    public string Author { get; set; } = "";

    public bool IsPublished { get; set; }
}
