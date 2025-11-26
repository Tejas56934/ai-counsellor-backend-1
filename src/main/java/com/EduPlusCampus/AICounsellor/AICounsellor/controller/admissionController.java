package com.EduPlusCampus.AICounsellor.AICounsellor.controller;

import com.EduPlusCampus.AICounsellor.AICounsellor.model.Admission;
import com.EduPlusCampus.AICounsellor.AICounsellor.repository.admissionRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/new-admission")
@CrossOrigin(
        origins = {
                "http://localhost:5173",
                "https://ai-counsellor-ioxq89tqt-tejas-projects-f7079041.vercel.app"
        }
)
public class admissionController{
    private final admissionRepository admissionRepository;

    public admissionController(admissionRepository admissionRepository){
        this.admissionRepository = admissionRepository;
    }

    @PostMapping("/submit")
    public ResponseEntity<?> submit(@Valid @RequestBody Admission admission){
        var saved = admissionRepository.save(admission);
        //return the ID so frontend can use it for updating preferences
        return ResponseEntity.ok().body(
                Map.of(
                        "status", "success",
                        "id", saved.getId(),
                        "message", "Admission submitted"
                )
        );
    }

    @PutMapping("/update-preferences")
    public ResponseEntity<?> updatePreferences(@RequestBody Map<String, Object> request){
        try {
            //Extract data from request
            Long id = Long.valueOf(request.get("id").toString());
            String stream = (String) request.get("stream");
            String level = (String) request.get("level");
            String programme = (String) request.get("programme");

            //Find the admission record
            Optional<Admission> optionalAdmission = admissionRepository.findById(id);

            if (optionalAdmission.isEmpty()) {
                return ResponseEntity.badRequest().body(
                        Map.of("status", "error", "message", "Admission record not found")

                );
            }
            //update the preferences

            Admission admission = optionalAdmission.get();
            admission.setStream(stream);
            admission.setLevel(level);
            admission.setProgramme(programme);

            //save the updated  record

            Admission updated = admissionRepository.save(admission);

            return ResponseEntity.ok().body(
                    Map.of(
                            "status", "sucess",
                            "message", "Preferences updated successfully",
                            "data", Map.of(
                                    "id", updated.getId(),
                                    "fullName", updated.getFullName(),
                                    "stream", updated.getStream(),
                                    "level", updated.getLevel(),
                                    "programme", updated.getProgramme()
                            )
                    )
            );
        }catch(Exception e){
            return  ResponseEntity.badRequest().body(
                    Map.of(
                            "status","error",
                            "message","Failed to update preferences:" + e.getMessage()
                    )
            );


        }
    }

@GetMapping("/{id}")
    public ResponseEntity<?> getAdmission(@PathVariable Long id){
        Optional<Admission> admission = admissionRepository.findById(id);

        if(admission.isEmpty()){
            return ResponseEntity.badRequest().body(
                    Map.of("status", "error", "message", "Admission not found")
            );
        }
        return ResponseEntity.ok(admission.get());
}

@GetMapping("/health")
    public ResponseEntity<?> health(){
        //Basic check to confirm DB connectivity
    long count = admissionRepository.count();
    return ResponseEntity.ok(Map.of("status", "ok", "admissions_count", count));

}
}