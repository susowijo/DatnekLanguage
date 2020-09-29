using System;
using System.Collections.Generic;

namespace DatnekLanguageAPI.Models
{
    public partial class UserLanguage
    {
        public int Id { get; set; }
        public int LanguageId { get; set; }
        public int? UserId { get; set; }
        public string LevelSpeacks { get; set; }
        public string WrittenLevel { get; set; }
        public string CompLevel { get; set; }

        public virtual Language Language { get; set; }
    }
}
