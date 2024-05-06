namespace AngularApp1.Server.DTOs
{
  public class ScoreUpdateDto
  {
    public string Pid { get; set; }
    public string SelectedEvent { get; set; }
    public double? Judge1 { get; set; }
    public double? Judge2 { get; set; }
    public double? Judge12 { get; set; }
    public double? Judge22 { get; set; }
    public double? Ded1 { get; set; }
    public double? Ded2 { get; set; }
    // Make sure not to include Avg1, Avg2, Total1, Total2, MaxScore
  }
}
