using System.Text.Json;
using System.Text.Json.Serialization;

namespace Pharmacy.Api.Data
{
    public class JsonStore
    {
        private readonly string _dataDir;
        private static readonly JsonSerializerOptions _options = new(JsonSerializerDefaults.Web)
        {
            WriteIndented = true,
            Converters = { new JsonStringEnumConverter() }
        };

        public JsonStore(IWebHostEnvironment env)
        {
            _dataDir = Path.Combine(env.ContentRootPath, "App_Data");
            Directory.CreateDirectory(_dataDir);
            EnsureFile("medicines.json", "[]");
            EnsureFile("sales.json", "[]");
        }

        private void EnsureFile(string file, string seed)
        {
            var path = Path.Combine(_dataDir, file);
            if (!File.Exists(path)) File.WriteAllText(path, seed);
        }

        public T? Read<T>(string file)
        {
            var path = Path.Combine(_dataDir, file);
            if (!File.Exists(path)) return default;
            var json = File.ReadAllText(path);
            return JsonSerializer.Deserialize<T>(json, _options);
        }

        public void Write<T>(string file, T value)
        {
            var path = Path.Combine(_dataDir, file);
            var json = JsonSerializer.Serialize(value, _options);
            File.WriteAllText(path, json);
        }
    }
}
