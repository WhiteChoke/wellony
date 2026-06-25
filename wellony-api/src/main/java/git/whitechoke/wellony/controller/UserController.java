package git.whitechoke.wellony.controller;

import git.whitechoke.wellony.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/users")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<?> getUserInfo() {
        var info = userService.getUserInfoById();

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(info);
    }

    @GetMapping("/avatar")
    public ResponseEntity<?> getUserAvatar() {
        var avatar = userService.getAvatar();
        return  ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .header(HttpHeaders.CACHE_CONTROL, "max-age=86400")
                .body(avatar);
    }

}
