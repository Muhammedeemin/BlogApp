using System.ComponentModel.DataAnnotations;

namespace BlogApi.Models;

public class BlogPost
{
    public int Id { get; set; }

    [Required]
    public string Title { get; set; } = "";

    public string Content { get; set; } = "";

    public string Author { get; set; } = "";

    public DateTime CreatedDate { get; set; }

    public bool IsPublished { get; set; }
}
