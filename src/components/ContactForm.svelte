<script lang="ts">
  let email = ""; // email input value
  let subject = ""; // subject input value
  let name = ""; // name input value
  let emailError = { enabled: false, msg: "" };
  let subjectError = { enabled: false, msg: "" };

  // TOASTS
  import { successToast, warningToast } from "../lib/toast-themes";

  function validateEmail() {
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (email.length === 0) {
      emailError.msg = "Email is required!";
      emailError.enabled = true;
      return false;
    } else if (!regex.test(email)) {
      emailError.enabled = true;
      emailError.msg = "Email format is not valid!";
      return false;
    }
    emailError.enabled = false;
    return true;
  }
  function validateSubject() {
    if (subject.length === 0) {
      subjectError.enabled = true;
      subjectError.msg = "Subject is required!";
      return false;
    } else {
      subjectError.enabled = false;
      return true;
    }
  }
  const api_url = import.meta.env.VITE_API_URL;
  function handleSubmit() {
    let emailIsValid = validateEmail();
    let subjectIsValid = validateSubject();
    let message = document.getElementById("message")["value"];
    console.log(message, email, subject, name);
    if (emailIsValid && subjectIsValid) {
      let data = {
        email: email,
        name: name,
        subject: subject,
        message: message,
      };
        fetch(`${api_url}/msg`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(data),
        }).then((res) => {
          if (res.ok) {
            successToast('Message was sent!')
          } else {
            warningToast("Oops! Something went wrong!");
          }
        });
        return;
    }
  }
</script>

<form
  on:submit|preventDefault={handleSubmit}
  class="flex flex-col justify-around text-neutral-200 w-1/2 min-h-[400px] font-bold  border-2 border-solid border-neutral-400 rounded-lg"
>
  <h1 class="font-bold text-xl my-2">Contact us</h1>
  <!-- EMAIL INPUT -->
  <div class="h-14 flex flex-col">
    <input
      on:blur={validateEmail}
      bind:value={email}
      type="email"
      id="email"
      placeholder="email"
      class="w-5/6 text-neutral-600 mx-auto rounded-md h-10 pl-2"
    />
    {#if emailError.enabled}<span class="text-xs text-red-300"
        >{emailError.msg}</span
      >{/if}
  </div>
  <!-- NAME INPUT -->
  <div class="h-14 flex flex-col">
    <input
      type="text"
      bind:value={name}
      placeholder="name"
      class="w-5/6 text-neutral-600 mx-auto rounded-md h-10 pl-2"
    />
  </div>
  <!-- SUBJECT INPUT -->
  <div class="h-14 flex flex-col">
    <input
      type="text"
      on:blur={validateSubject}
      bind:value={subject}
      placeholder="subject"
      class="w-5/6 text-neutral-600  mx-auto rounded-md h-10 pl-2"
      id="subject"
    />
    {#if subjectError.enabled}<span class="text-xs text-red-300"
        >{subjectError.msg}</span
      >{/if}
  </div>
  <!-- MESSAGE TEXTAREA -->
  <textarea
    class="mt-2 h-24 text-black w-5/6 mx-auto rounded-md"
    id="message"
    autocomplete="false"
  />

  <button
    type="submit"
    class="w-5/6 mx-auto mt-3 mb-4 rounded-md py-2 hover:bg-blue-700 text-lg font-bold  bg-blue-600"
    >Send</button
  >
</form>
