import { Controller } from "../../decorators/Controller.js";
import { Get } from "../../decorators/Get.js";

@Controller()
export class HomeController {
  @Get()
  home() {
    return "Welcome home, I love you 😍";
  }
}
