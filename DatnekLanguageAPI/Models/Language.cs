using System;
using System.Collections.Generic;

namespace DatnekLanguageAPI.Models
{
    public partial class Language
    {
        public Language()
        {
            UserLanguage = new HashSet<UserLanguage>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<UserLanguage> UserLanguage { get; set; }
    }
}
