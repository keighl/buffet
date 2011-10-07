require 'uglifier'

task :default do
  js = Uglifier.compile(File.read("jquery.buffet.js"))
  File.open('jquery.buffet.min.js', 'w') { |f| f.write(js) }
end