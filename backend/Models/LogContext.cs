using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class LogContext : DbContext
    {
        public LogContext(DbContextOptions<LogContext> options)
            : base(options)
        {
        }

        public DbSet<LogItem> LogItems { get; set; }
    }
}