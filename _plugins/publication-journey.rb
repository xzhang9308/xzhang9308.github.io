require 'bibtex'

module Jekyll
  class PublicationJourney < Generator
    safe true
    priority :normal

    # Relevant CCF-A venues in this bibliography (exact names exclude workshops
    # and Findings); ECCV is included separately at the owner's request.
    # https://www.ccf.org.cn/Academic_Evaluation/AI/
    # https://www.ccf.org.cn/Academic_Evaluation/CGAndMT/
    CCF_A_VENUES = ['AAAI', 'NeurIPS', 'CVPR', 'ACM MM', 'TIP', 'TPAMI'].freeze

    def generate(site)
      bibliography = BibTeX.open(File.join(site.source, '_bibliography', 'papers.bib'))
      papers = bibliography.entries.values.filter_map do |entry|
        next if entry[:year].to_s.to_i < 2019
        first = entry.author&.first
        first_author = first && first.first.to_s == 'Xi' && first.last.to_s == 'Zhang'
        corresponding = entry[:corresponding_authors].to_s.split(';').map(&:strip).include?('Xi Zhang')
        venue = entry[:abbr].to_s.sub(/ - (Oral|Highlight|Spotlight)\z/, '').sub(/\s+#{entry[:year]}(?=\s|$)/, '')
        next unless first_author || corresponding || CCF_A_VENUES.include?(venue) || venue == 'ECCV' || entry[:journey_include].to_s == 'true'

        {
          'key' => entry.key,
          'year' => entry[:year].to_s.to_i,
          'title' => entry[:title].to_s,
          'short_title' => site.data.fetch('publication_short_titles', {}).fetch(entry.key, entry.key),
          'venue' => entry[:journey_venue].to_s.empty? ? venue : entry[:journey_venue].to_s,
          'award' => entry[:journey_award].to_s,
          'award_name' => entry[:award_name].to_s,
          'distinction' => entry[:abbr].to_s[/ - (Oral|Highlight|Spotlight)\z/, 1],
          'role' => first_author && corresponding ? 'First & corresponding author' : (first_author ? 'First author' : (corresponding ? 'Corresponding author' : 'Co-author')),
          'corresponding' => corresponding,
          'journal' => entry.type.to_s == 'article'
        }
      end
      # Conferences precede journals within each year; preserve source order within each type.
      papers = papers.each_with_index.sort_by { |paper, index| [paper['year'], paper['journal'] ? 1 : 0, index] }.map(&:first)
      # Editorial ordering within the same year and publication type.
      {
        'zhang2026modalityaware' => 'nema2026longvqubench',
        'zhang2020davd' => 'zhang2020numerosity'
      }.each do |key, before_key|
        paper = papers.find { |item| item['key'] == key }
        target = papers.find { |item| item['key'] == before_key }
        next unless paper && target && paper['year'] == target['year'] && paper['journal'] == target['journal']
        papers.delete(paper)
        papers.insert(papers.index(target), paper)
      end
      years = papers.group_by { |paper| paper['year'] }.map { |year, items| { 'year' => year, 'papers' => items } }
      site.data['publication_journey'] = { 'count' => papers.length, 'rows' => years.each_slice(5).to_a }
    end
  end
end
