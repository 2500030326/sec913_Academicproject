package mth.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mth.models.Source;
import mth.repository.SourceRepository;

@Service
public class SourceService {

    @Autowired
    private SourceRepository sourceRepository;

    public List<Source> listAll() {
        List<Source> sources = sourceRepository.findAll();
        if (sources.isEmpty()) {
            seedDefaultSources();
            sources = sourceRepository.findAll();
        }
        return sources;
    }

    public Source createSource(Source source) {
        source.setCreatedAt(LocalDateTime.now());
        source.setUpdatedAt(LocalDateTime.now());
        source.setStatus(source.getStatus() == null || source.getStatus().isBlank() ? "Active" : source.getStatus());
        source.setActive(!"Inactive".equalsIgnoreCase(source.getStatus()));
        if (source.getScore() <= 0) {
            source.setScore(75);
        }
        return sourceRepository.save(source);
    }

    private void seedDefaultSources() {
        Source reuters = new Source();
        reuters.setName("Reuters");
        reuters.setCategories("Business, Markets");
        reuters.setStatus("Active");
        reuters.setScore(96);
        reuters.setActive(true);
        reuters.setCreatedAt(LocalDateTime.now());
        reuters.setUpdatedAt(LocalDateTime.now());

        Source bbc = new Source();
        bbc.setName("BBC News");
        bbc.setCategories("World, Politics");
        bbc.setStatus("Active");
        bbc.setScore(95);
        bbc.setActive(true);
        bbc.setCreatedAt(LocalDateTime.now());
        bbc.setUpdatedAt(LocalDateTime.now());

        Source techCrunch = new Source();
        techCrunch.setName("TechCrunch");
        techCrunch.setCategories("Technology, Startups");
        techCrunch.setStatus("Active");
        techCrunch.setScore(92);
        techCrunch.setActive(true);
        techCrunch.setCreatedAt(LocalDateTime.now());
        techCrunch.setUpdatedAt(LocalDateTime.now());

        Source industryWire = new Source();
        industryWire.setName("Industry Wire");
        industryWire.setCategories("Business");
        industryWire.setStatus("Review");
        industryWire.setScore(78);
        industryWire.setActive(false);
        industryWire.setCreatedAt(LocalDateTime.now());
        industryWire.setUpdatedAt(LocalDateTime.now());

        sourceRepository.save(reuters);
        sourceRepository.save(bbc);
        sourceRepository.save(techCrunch);
        sourceRepository.save(industryWire);
    }
}
