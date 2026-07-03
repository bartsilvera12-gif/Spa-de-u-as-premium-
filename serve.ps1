$root = "C:\NEURA\Spa-de-u-as-premium-\dist"
$port = 8080
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
Add-Type -AssemblyName System.Web
$listener.Start()
Write-Host "Servidor en http://localhost:$port/  (Ctrl+C para detener)"

$mime = @{
  ".html"="text/html; charset=utf-8"; ".htm"="text/html; charset=utf-8"
  ".css"="text/css; charset=utf-8"; ".js"="application/javascript; charset=utf-8"
  ".json"="application/json"; ".png"="image/png"; ".jpg"="image/jpeg"
  ".jpeg"="image/jpeg"; ".gif"="image/gif"; ".svg"="image/svg+xml"
  ".ico"="image/x-icon"; ".woff"="font/woff"; ".woff2"="font/woff2"
  ".txt"="text/plain; charset=utf-8"; ".md"="text/markdown; charset=utf-8"
}

while ($listener.IsListening) {
  try {
    $ctx = $listener.GetContext()
    $req = $ctx.Request; $res = $ctx.Response
    $path = [System.Web.HttpUtility]::UrlDecode($req.Url.AbsolutePath).TrimStart('/')
    if ([string]::IsNullOrEmpty($path)) { $path = "index.html" }
    $file = Join-Path $root $path
    if ((Test-Path $file) -and -not (Get-Item $file).PSIsContainer) {
      $ext = [System.IO.Path]::GetExtension($file).ToLower()
      $res.ContentType = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { "application/octet-stream" }
      $bytes = [System.IO.File]::ReadAllBytes($file)
      $res.ContentLength64 = $bytes.Length
      $res.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $res.StatusCode = 404
      $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $path")
      $res.OutputStream.Write($msg, 0, $msg.Length)
    }
    $res.OutputStream.Close()
    Write-Host "$($req.HttpMethod) $($req.Url.AbsolutePath) -> $($res.StatusCode)"
  } catch { Write-Host "Error: $_" }
}
