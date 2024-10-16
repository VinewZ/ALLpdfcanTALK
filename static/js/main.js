window.onload = () => {
  const form = document.querySelector("#form-upload")
  const fileInput = document.querySelector("#file-input")
  const fileName = document.querySelector("#file-name")
  const fileIcon = document.querySelector("#file-icon")
  const btnSubmit = document.querySelector("#btn-submit")
  const btnTrash = document.querySelector("#btn-trash")

  const formState = {
    initial: {
      fileName: "Upload a PDF or a TXT",
      fileIcon: "/static/images/upload.svg",
      disableSubmit: true
    },
    fileSelected: {
      fileName: "",
      fileIcon: "/static/images/file.svg",
      disableSubmit: false
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    if (formData.get('file-input').type !== 'application/pdf' && formData.get('file-input').type !== 'text/plain') {
      alert('Please upload a PDF or a TXT file')
      return
    }
    const response = await fetch(form.action, {
      method: form.method,
      body: formData
    })
    const data = await response.json()
    clearForm()
  })

  fileInput.addEventListener('change', (e) => {
    formState.fileSelected.fileName = e.target.files[0].name
    switch (e.target.files[0] ? "fileSelected" : "initial") {
      case "fileSelected":
        fileName.innerText = formState.fileSelected.fileName
        fileIcon.src = formState.fileSelected.fileIcon
        btnSubmit.disabled = formState.fileSelected.disableSubmit
        break
      case "initial":
        fileName.innerText = formState.initial.fileName
        fileIcon.src = formState.initial.fileIcon
        btnSubmit.disabled = formState.initial.disableSubmit
        break
    }
  });

  btnTrash.addEventListener("click", () => clearForm())

  function clearForm() {
    fileInput.value = null
    fileName.innerText = formState.initial.fileName
    fileIcon.src = formState.initial.fileIcon
    btnSubmit.disabled = formState.initial.disableSubmit
  }
}
