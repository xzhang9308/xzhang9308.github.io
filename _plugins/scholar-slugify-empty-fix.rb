# frozen_string_literal: true

# Jekyll Scholar calls Utils.slugify on every BibTeX field when building details URLs.
# Empty fields (e.g. arxiv={}) produce "Warning: Empty `slug` generated for ''." noise.
# Skip slugify for blank values; keep DOI handling identical to upstream.

Jekyll::Hooks.register :site, :after_init do
  next unless defined?(Jekyll::Scholar::Utilities)

  Jekyll::Scholar::Utilities.module_eval do
    def details_path_for(entry)
      url_placeholders = {}
      entry.fields.each_pair do |k, v|
        value = v.to_s.dup
        url_placeholders[k] =
          if k == :doi
            value
          elsif value.strip.empty?
            value
          else
            Jekyll::Utils.slugify(value, mode: "pretty")
          end
      end
      url_placeholders[:key] = entry.key.to_s.gsub(/[:\s]+/, "_")
      url_placeholders[:details_dir] = details_path

      if site.config["permalink"] == "pretty" || site.config["permalink"].to_s.end_with?("/")
        url_placeholders[:extension] = "/"
      else
        url_placeholders[:extension] = ".html"
      end

      if !entry.has_field?("doi") || entry.doi.empty?
        url_placeholders[:doi] = url_placeholders[:key]
      end

      Jekyll::URL.new(
        template: config["details_permalink"],
        placeholders: url_placeholders
      ).to_s
    end
  end
end
